import sequelize from '../configs/mysql.connect';
import { Model, DataTypes } from 'sequelize';
import User from './user.model';

interface RoleAttributes {
  id: number,
  name: string,
  color: string,
  permission: string | object,
  allowDelete: boolean
}

class Role extends Model<RoleAttributes> implements RoleAttributes {
  public id!: number;
  public name!: string;
  public color!: string;
  public permission!: string | object;
  public allowDelete!: boolean;

  static associate() {
    Role.hasMany(User, { 
      as: 'users', 
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
  }

  static defineScope() {
    
  }
}

Role.init({
  id: {
    field: 'id',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    field: 'name',
    type: DataTypes.STRING,
  },
  color: {
    field: 'color',
    type: DataTypes.STRING,
  },
  permission: {
    field: 'permission',
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: {}
  },
  allowDelete: {
    field: 'allow_delete',
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 1
  }
}, {
  sequelize,
  tableName: 'role',
  timestamps: false,
  paranoid: false
});

export default Role;
