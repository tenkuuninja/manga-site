import sequelize from '../configs/mysql.connect';
import { Model, DataTypes } from 'sequelize';
import Manga from './manga.model';

interface ChapterAttributes {
  id: number,
  mangaId: number,
  title: string,
  number: number,
  content: string,
  totalPage: number
}

class Chapter extends Model<ChapterAttributes> implements ChapterAttributes {
  public id!: number;
  public mangaId!: number;
  public title!: string;
  public number!: number;
  public content!: string;
  public totalPage!: number;

  public readonly updatedAt!: Date;

  public readonly manga?: Manga;

  static associate() {
    Chapter.belongsTo(Manga, { as: 'manga' });
  }

  static defineScope() {
    
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
    type: DataTypes.STRING,
    get() {
      const rawValue = this.getDataValue('content');
      return rawValue.split(',').filter(e => e.length > 0);
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
}, {
  sequelize,
  tableName: 'chapter',
  createdAt: false,
  paranoid: false
});

export default Chapter;
