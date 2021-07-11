import sequelize from '../configs/mysql.connect';
import { Model, DataTypes } from 'sequelize';

interface MangaReadedAttributes {
  mangaId: number,
  userId: number,
  chapter: number
}

class MangaReaded extends Model<MangaReadedAttributes> implements MangaReadedAttributes {
  public mangaId!: number;
  public userId!: number;
  public chapter!: number;

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
  chapter: {
    field: 'chapter',
    type: DataTypes.FLOAT.UNSIGNED,
    allowNull: false,
  }
}, {
  sequelize,
  tableName: 'manga_readed',
  createdAt: false,
  paranoid: false
});

export default MangaReaded;
