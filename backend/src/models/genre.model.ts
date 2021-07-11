import sequelize from '../configs/mysql.connect';
import { Model, DataTypes } from 'sequelize';
import Manga from './manga.model';

interface GenreAttributes {
  id: number,
  title: string,
  titleSlug: string,
  description: string,
  imageUrl: string
}

class Genre extends Model<GenreAttributes> implements Genre {
  public id!: number;
  public title!: string;
  public titleSlug!: string;
  public description!: string;
  public imageUrl!: string;

  public readonly mangas?: Manga;

  static associate() {
    Genre.belongsToMany(Manga, {through: 'manga_genre', as: 'mangas', timestamps: false });
  }

  static defineScope() {
    
  }
}

Genre.init({
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
  },
  titleSlug: {
    field: 'title_slug',
    type: DataTypes.STRING,
  },
  description: {
    field: 'description',
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: ''
  },
  imageUrl: {
    field: 'image_url',
    type: DataTypes.STRING,
  }
}, {
  sequelize,
  tableName: 'genre',
  timestamps: false,
  paranoid: false
});

export default Genre;
