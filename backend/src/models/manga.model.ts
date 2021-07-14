import sequelize from '../configs/mysql.connect';
import seq from 'sequelize';
import { 
  DataTypes, 
  Model, 
  Op,
  Optional,
  HasManyCreateAssociationMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManyHasAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyCountAssociationsMixin
} from 'sequelize';
import Genre from './genre.model';
import Chapter from './chapter.model';
import Comment from './comment.model';
import User from './user.model';
import MangaReaded from './manga_readed.model';
import { changeToSlug } from '../utils/string';

interface MangaAttributes {
  id: number,
  title: string,
  titleSlug: string,
  titleSynonym: string,
  imageUrl: string,
  description: string,
  country: 'jp' | 'cn' | 'kr' | null,
  author: string,
  isFinish: boolean,
  chapter: number,
  favorite: number,
  rate: string,
  view: number,
  viewDay: number,
  viewWeek: number,
  viewMonth: number,
  leechType: string,
  leechUrl: string
}

interface MangaCreationAttributes extends Optional<MangaAttributes, "id"> {}

class Manga extends Model<MangaAttributes, MangaCreationAttributes> implements MangaAttributes {
  public id!: number;
  public title!: string;
  public titleSlug!: string;
  public titleSynonym!: string;
  public imageUrl!: string;
  public description!: string;
  public country!: 'jp' | 'cn' | 'kr' | null;
  public author!: string;
  public isFinish!: boolean;
  public chapter!: number;
  public favorite!: number;
  public rate!: string;
  public view!: number;
  public viewDay!: number;
  public viewWeek!: number;
  public viewMonth!: number;
  public leechType!: string;
  public leechUrl!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  public readonly chapters?: Chapter[];
  public readonly comments?: Comment[];
  public readonly genres?: Genre[];
  public readonly users?: User[];

  public getChapters!: HasManyGetAssociationsMixin<Chapter>;
  public addChapter!: HasManyAddAssociationMixin<Chapter, number>;
  public addChapters!: HasManyAddAssociationsMixin<Chapter, number>;
  public removeChapter!: HasManyRemoveAssociationMixin<Chapter, number>;
  public removeChapters!: HasManyRemoveAssociationsMixin<Chapter, number>;
  public setChapters!: HasManySetAssociationsMixin<Chapter, number>;
  public hasChapter!: HasManyHasAssociationMixin<Chapter, number>;
  public hasChapters!: HasManyHasAssociationsMixin<Chapter, number>;
  public countChapters!: HasManyCountAssociationsMixin;

  public getComments!: HasManyGetAssociationsMixin<Comment>;
  public addComment!: HasManyAddAssociationMixin<Comment, number>;
  public addComments!: HasManyAddAssociationsMixin<Comment, number>;
  public removeComment!: HasManyRemoveAssociationMixin<Comment, number>;
  public removeComments!: HasManyRemoveAssociationsMixin<Comment, number>;
  public setComments!: HasManySetAssociationsMixin<Comment, number>;
  public hasComment!: HasManyHasAssociationMixin<Comment, number>;
  public hasComments!: HasManyHasAssociationsMixin<Comment, number>;
  public countComments!: HasManyCountAssociationsMixin;

  public getGenres!: BelongsToManyGetAssociationsMixin<Genre>;
  public setGenres!: BelongsToManySetAssociationsMixin<Genre, number>;
  public countGenres!: BelongsToManyCountAssociationsMixin;

  public countUsers!: BelongsToManyCountAssociationsMixin;

  static associate() {
    Manga.hasMany(Chapter, {
      as: 'chapters',
      foreignKey: {
        name: 'manga_id',
        allowNull: false
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    })
    Manga.hasMany(Comment, {
      as: 'comments',
      foreignKey: {
        name: 'manga_id', 
        allowNull: false
      }, 
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE'
    })
    Manga.belongsToMany(Genre, {through: 'manga_genre', as: 'genres', timestamps: false });
    Manga.belongsToMany(User, {through: 'manga_user', as: 'users', timestamps: false});
    Manga.belongsToMany(User, {through: MangaReaded, as: 'readed'});
  }

  static defineScope() {
    Manga.addScope('includeGenre', {
      include: 'genres'
    });
    Manga.addScope('includeUser', {
      include: {
        model: User,
        as: 'users',
        attributes: {
          exclude: ['password', 'verify_token', 'reset_token', 'setting']
        }
      }
      
    });
    Manga.addScope('includeChapter', {
      include: 'chapters',
      order: [['chapters', 'number', 'DESC']]
    });
    Manga.addScope('includeComment', {
      include: 'comments',
      order: [['chapters', 'updatedAt', 'DESC']]
    });
    Manga.addScope('showTotalFollowingById', (id) => ({
      attributes: {
        include: [[seq.literal("(SELECT COUNT(`User`.`id`) AS `count` FROM `user` AS `User` INNER JOIN `manga_user` AS `manga_user` ON `User`.`id` = `manga_user`.`user_id` AND `manga_user`.`manga_id` = "+id+")"), 'totalFollowing']]
      }
    }));
    Manga.addScope('hideSrcLeech', {
      attributes: {
        exclude: ['leechType', 'leechUrl']
      }
    });
    Manga.addScope('sortQuery', (orders: string | string[]) => {
      if (typeof orders === 'string') orders = orders.split(',')
      let order: [string, string][] = []
      for (let value of orders) {
        if (!/^(\-|\+)[a-zA-Z0-9_-]+$/g.test(value)) continue;
        let orderType = value.substr(0, 1) == '+' ? 'ASC' : 'DESC';
        let orderName = value.substr(1);
        order.push([orderName, orderType]);
      }
      return { order }
    });
    Manga.addScope('searchQuery', (search: string) => {
      let text = search.replace(/\+/, ' ');
      let slug = changeToSlug(text);
      let slugToRegex = slug.split('-').map(i => '('+i+')').join('|');
      let textToRegex = text.split(' ').map(i => '('+i+')').join('|');
      return {
        where: {
          [Op.or]: {
            title: { [Op.regexp]: textToRegex },
            title_slug: { [Op.regexp]: slugToRegex },
            title_synonym: { [Op.regexp]: textToRegex },
            description: { [Op.substring]: text }
          }
        }
      }
    });
    Manga.addScope('filterQuery', (filter: string | string[]) => {
      if (typeof filter === 'string') filter = [filter];
      let s = Op;
      let filterObj: any = {};
      for (let filterItem of filter) {
        if (!/^[a-zA-Z0-9]+\:[a-zA-Z]{2,10}\:[^\:]+$/g.test(filterItem)) continue;
        let [field, operator, value] = filterItem.split(':');
        let op: keyof typeof Op = operator as keyof typeof Op;
        filterObj[field] = { [Op[op]]: value };
      }
      return {
        where: filterObj
      }
    });
    Manga.addScope('filterGenre', (genreIds: number[] | string[]) => {
      return {
        where: seq.literal(genreIds.map((id: number | string) => "EXISTS ( SELECT * FROM `manga_genre` WHERE `manga_genre`.`genre_id` = "+id+" AND `manga_genre`.`manga_id` = `manga`.`id`)").join(' AND '))
      }
    });
    Manga.addScope('paging', (page: number, pageSize: number) => {
      return {
        limit: pageSize,
        offset: (page-1)*pageSize
      }
    })
  }
}

Manga.init({
  id: {
    field: 'id',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    field: 'title',
    type: DataTypes.STRING,
    allowNull: false,
  },
  titleSlug: {
    field: 'title_slug',
    type: DataTypes.STRING,
    allowNull: false
  },
  titleSynonym: {
    field: 'title_synonym',
    type: DataTypes.STRING,
    defaultValue: '',
    get() {
      const rawValue = this.getDataValue('titleSynonym');
      return rawValue.split(',').filter(e => e.length > 0);
    },
    set(value: string | string[]) {
      if (typeof value != 'string') value = value.join(',');
      this.setDataValue('titleSynonym', value);
    }
  },
  imageUrl: {
    field: 'image_url',
    type: DataTypes.STRING,
    defaultValue: '',
  },
  description: {
    field: 'description',
    type: DataTypes.TEXT,
    defaultValue: '',
  },
  country: {
    field: 'country',
    type: DataTypes.ENUM('jp', 'cn', 'kr'),
    defaultValue: 'jp'
  },
  author: {
    field: 'author',
    type: DataTypes.STRING,
    defaultValue: '',
    get() {
      const rawValue = this.getDataValue('author');
      return rawValue.split(',').filter(e => e.length > 0);
    },
    set(value: string | string[]) {
      if (typeof value != 'string') value = value.join(',');
      this.setDataValue('author', ','+value+',');
    }
  },
  isFinish: {
    field: 'is_finish',
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0
  },
  chapter: {
    field: 'chapter',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  favorite: {
    field: 'favorite',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  rate: {
    field: 'rate',
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "{\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":1}",
    get() {
      const rawValue = this.getDataValue('rate');
      return JSON.parse(rawValue);
    },
    set(value: any) {
      if (typeof value != 'string') value = JSON.stringify(value)
      this.setDataValue('rate', value);
    }
  },
  view: {
    field: 'view',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  viewDay: {
    field: 'view_day',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  viewWeek: {
    field: 'view_week',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  viewMonth: {
    field: 'view_month',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  leechType: {
    field: 'leech_type',
    type: DataTypes.STRING,
  },
  leechUrl: {
    field: 'leech_url',
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  tableName: 'manga'
});

export default Manga;

