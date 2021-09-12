import sequelize from '../configs/mysql.connect';
import { Model, DataTypes } from 'sequelize';

interface MangaReadedAttributes {
  mangaId: number,
  userId: number,
  lastChapterId: number,
  lastChapter: number,
  readed: string | number[]
}

class MangaReaded extends Model<MangaReadedAttributes> implements MangaReadedAttributes {
  public mangaId!: number;
  public userId!: number;
  public lastChapterId!: number;
  public lastChapter!: number;
  public readed!: string | number[];

  public readonly updatedAt!: Date;

}

MangaReaded.init({
  mangaId: {
    field: 'manga_id',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'Manga',
      key: 'id'
    }
  },
  userId: {
    field: 'user_id',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  lastChapterId: {
    field: 'last_chapter_id',
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  lastChapter: {
    field: 'last_chapter',
    type: DataTypes.FLOAT.UNSIGNED,
    allowNull: false,
  },
  readed: {
    field: 'readed',
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      let rawValue = this.getDataValue('readed');
      if (typeof rawValue === 'string') rawValue = rawValue.split(',').map(i => +i);
      return rawValue;
    },
    set(value: string | string[] | number[]) {
      if (typeof value != 'string') value = value.join(',')
      this.setDataValue('readed', value);
    }
  }
}, {
  sequelize,
  tableName: 'manga_readed',
  createdAt: false,
  paranoid: false
});

export default MangaReaded;
