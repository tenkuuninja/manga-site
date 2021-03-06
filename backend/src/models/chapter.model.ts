import sequelize from '../configs/mysql.connect';
import seq, { 
  Model, 
  DataTypes,
  Op,
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
} from 'sequelize';
import Manga from './manga.model';
import Genre from './genre.model';
import { caesarCipher } from '../utils/string';

interface ChapterAttributes {
  id: number,
  mangaId: number,
  title: string,
  number: number,
  content: string,
  totalPage: number,
  navigation: any
}

class Chapter extends Model<ChapterAttributes> implements ChapterAttributes {
  public id!: number;
  public mangaId!: number;
  public title!: string;
  public number!: number;
  public content!: string;
  public totalPage!: number;
  public navigation!: any;

  public readonly updatedAt!: Date;

  public readonly manga?: Manga;

  public getManga!: BelongsToGetAssociationMixin<Manga>;
  public setManga!: BelongsToSetAssociationMixin<Manga, number>;

  static associate() {
    Chapter.belongsTo(Manga, { as: 'manga' });
  }

  static defineScope() {
    Chapter.addScope('includeManga', {
      include: {
        model: Manga,
        as: 'manga',
        attributes: {
          exclude: ['leechType', 'leechUrl']
        }
      }
    });
    Chapter.addScope('sortQuery', (orders: string | string[]) => {
      if (typeof orders === 'string') orders = orders.split(',')
      let order: [any, string][] = []
      for (let value of orders) {
        if (!/^(\-|\+)[a-zA-Z0-9_\.]+$/g.test(value)) continue;
        let orderType = value.substr(0, 1) == '+' ? 'ASC' : 'DESC';
        let orderColumn = value.substr(1);
        order.push([seq.literal('`'+orderColumn+'`'), orderType]);
      }
      return { order }
    });
  }

  static defineHook() {
    
  }
}

Chapter.init({
  id: {
    field: 'id',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  mangaId: {
    field: 'manga_id',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  title: {
    field: 'title',
    type: DataTypes.STRING,
    defaultValue: '',
    get() {
      return this.getDataValue('title').replace(/^\:\s/, '');
    },
  },
  number: {
    field: 'number',
    type: DataTypes.FLOAT.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  content: {
    field: 'content',
    type: DataTypes.TEXT,
    defaultValue: '',
    get() {
      const rawValue = this.getDataValue('content');
      const chapterId = this.getDataValue('id');
      const mangaId = this.getDataValue('mangaId');
      const domain = process.env.DOMAIN_GET_IMAGE || 'http://localhost:5000';
      return rawValue.split(',').filter(e => e.length > 0).map((item: string, i) => {
        let data = 'http://'+item.replace(/^\/+/g, '');
        if (process.env.DOMAIN_REFERER) {
          data += '|*|'+process.env.DOMAIN_REFERER;
        }
        let key = caesarCipher().encode(data);
        return `${domain.replace(/\/$/g, '')}/images/b/content/${mangaId}/${chapterId}/${i+1}.jpg?key=${key}`;
      });
    },
    set(value: string | string[]) {
      if (typeof value != 'string') value = value.join(',');
      this.setDataValue('content', value);
    }
  },
  totalPage: {
    field: 'total_page',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  navigation: {
    type: DataTypes.VIRTUAL,
    defaultValue: { previous: null, next: null },
    set(value: any) {
      this.setDataValue('navigation', value);
    }
  }
}, {
  sequelize,
  tableName: 'chapter',
  createdAt: false,
  paranoid: false
});

export default Chapter;
