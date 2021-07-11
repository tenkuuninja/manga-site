import sequelize from '../configs/mysql.connect';
import { DataTypes, Model } from 'sequelize';
import Manga from './manga.model';
import MangaReaded from './manga_readed.model';
import Comment from './comment.model';

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
   })
    User.belongsToMany(Manga, {through: 'manga_user', as: 'mangas', timestamps: false});
    User.belongsToMany(Manga, {through: MangaReaded, as: 'readed'});
  }

  static defineScope() {
    
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
  },
  email: {
    field: 'email',
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  avatar: {
    field: 'avatar',
    type: DataTypes.STRING
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
    type: DataTypes.JSON,
    defaultValue: {}
  }
}, {
  sequelize,
  tableName: 'user'
});

export default User;


