import sequelize from '../configs/mysql.connect';
import { DataTypes, Model, Op } from 'sequelize';
import bcrypt from 'bcrypt';
import Manga from './manga.model';
import MangaReaded from './manga_readed.model';
import Comment from './comment.model';
import Role from './role.model';

interface UserAttributes {
  id: number,
  username: string,
  password: string,
  email: string,
  avatar: string,
  roleId: number,
  status: string,
  verifyToken: string,
  resetToken: string,
  setting: string | object
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public avatar!: string;
  public roleId!: number;
  public status!: string;
  public verifyToken!: string;
  public resetToken!: string;
  public setting!: string | object;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

  public readonly mangas?: Manga;
  public readonly readed?: Manga;

  static associate() {
    User.hasMany(Comment, { 
      as: 'comments', 
      foreignKey: {
        name: 'user_id',
        allowNull: true,
        defaultValue: null
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    });
    User.belongsTo(Role, { as: 'role' });
    User.belongsToMany(Manga, {through: 'manga_user', as: 'mangas', timestamps: false});
    User.belongsToMany(Manga, {through: MangaReaded, as: 'readed'});
  }

  static defineScope() {
    User.addScope('includeRole', {
      include: {
        model: Role,
        as: 'role',
        attributes: {
          exclude: ['permission', 'allowDelete']
        }
      }
    });
    User.addScope('hideSensitive', {
      attributes: {
        exclude: ['password', 'verifyToken', 'resetToken', 'setting']
      }
    });
    User.addScope('sortQuery', (orders: string | string[]) => {
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
    User.addScope('searchQuery', (search: string) => {
      return {
        where: {
          [Op.or]: {
            username: { [Op.like]: '%'+search+'%' },
            email: { [Op.like]: '%'+search+'%' },
          }
        }
      }
    });
    User.addScope('filterQuery', (filter: string | string[]) => {
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
    User.addScope('paging', (page: number, pageSize: number) => {
      return {
        limit: pageSize,
        offset: (page-1)*pageSize
      }
    })
  }
}

User.init({
  id: {
    field: 'id',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    field: 'username',
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    field: 'password',
    type: DataTypes.STRING,
    allowNull: false,
    set(value: string) {
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(value, salt);
      this.setDataValue('password', hash);
    }
  },
  email: {
    field: 'email',
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  avatar: {
    field: 'avatar',
    type: DataTypes.STRING,
    defaultValue: ''
  },
  roleId: {
    field: 'role_id',
    type: DataTypes.INTEGER.UNSIGNED,
    defaultValue: 2
  },
  status: {
    field: 'status',
    type: DataTypes.ENUM('non active', 'active', 'looked'),
    defaultValue: 'non active'
  },
  verifyToken: {
    field: 'verify_token',
    type: DataTypes.STRING
  },
  resetToken: {
    field: 'reset_token',
    type: DataTypes.STRING
  },
  setting: {
    field: 'setting',
    type: DataTypes.STRING,
    defaultValue: JSON.stringify({})
  }
}, {
  sequelize,
  tableName: 'user'
});

export default User;


