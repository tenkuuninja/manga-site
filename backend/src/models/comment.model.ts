import { Op } from 'sequelize';
import sequelize from '../configs/mysql.connect';
import { Model, DataTypes } from 'sequelize';
import Manga from './manga.model';
import User from './user.model';

interface CommentAttributes {
  id: number;
  mangaId: number;
  userId: number;
  parentId: number;
  chapter: number;
  name: string;
  email: string;
  content: string;
  point: number;
}

class Comment extends Model<CommentAttributes> implements CommentAttributes {
  public id!: number;
  public mangaId!: number;
  public userId!: number;
  public parentId!: number;
  public chapter!: number;
  public name!: string;
  public email!: string;
  public content!: string;
  public point!: number;

  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date | null;

  public readonly manga?: Manga;
  public readonly user?: User;
  public readonly replies?: Comment;

  static associate() {
    Comment.belongsTo(Manga, { as: 'manga' });
    Comment.belongsTo(User, { as: 'user' });
    Comment.hasMany(Comment, {
      as: 'replies',
      foreignKey: {
        name: 'parent_id',
        allowNull: true,
        defaultValue: null
      },
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE'
    })
  }

  static defineScope() {
    Comment.addScope('includeManga', {
      include: 'manga'
    });
    Comment.addScope('includeUser', {
      include: 'user'
    });
    Comment.addScope('includeReply', {
      include: 'replies',
      order: [['replies', 'createdAt', 'DESC']]
    });
    Comment.addScope('sortQuery', (orders: string | string[]) => {
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
    Comment.addScope('searchQuery', (search: string) => {
      search = search.replace(/\+/, ' ');
      let searchRegex = search.replace(/\+/, ' ').split(' ').map(i => '('+i+')').join('|');
      return {
        where: {
          [Op.or]: {
            name: { [Op.regexp]: searchRegex },
            email: { [Op.like]: '%'+search+'%' },
            content: { [Op.regexp]: searchRegex }
          }
        }
      }
    });
    Comment.addScope('filterQuery', (filter: string | string[]) => {
      if (typeof filter === 'string') filter = [filter];
      let s = Op;
      let filterObj: any = {};
      for (let filterItem of filter) {
        if (!/^[a-zA-Z0-9]+\:[a-zA-Z]{2,10}\:[^\:]+$/g.test(filterItem)) continue;
        let [field, operator, value] = filterItem.split(':');
        filterObj[field] = { [Op[operator as keyof typeof Op]]: value };
      }
      return {
        where: filterObj
      }
    });
    Comment.addScope('paging', (page: number, pageSize: number) => {
      return {
        limit: pageSize,
        offset: (page-1)*pageSize
      }
    })
  }
}

Comment.init({
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
  userId: {
    field: 'user_id',
    type: DataTypes.INTEGER.UNSIGNED,
  },
  parentId: {
    field: 'parent_id',
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: null
  },
  chapter: {
    field: 'chapter',
    type: DataTypes.FLOAT.UNSIGNED,
    allowNull: false
  },
  name: {
    field: 'name',
    type: DataTypes.STRING,
  },
  email: {
    field: 'email',
    type: DataTypes.STRING,
  },
  content: {
    field: 'content',
    type: DataTypes.TEXT,
  },
  point: {
    field: 'point',
    type: DataTypes.FLOAT.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
}, {
  sequelize,
  tableName: 'comment',
  updatedAt: false
});

export default Comment;
