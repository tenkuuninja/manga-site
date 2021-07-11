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
    Chapter.addScope('includeManga', {
      include: 'manga'
    });
    Chapter.addScope('sortQuery', (orders: string | string[]) => {
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
  }

  static defineHook() {
    Chapter.addHook('afterFind', (result: Chapter) => {
      console.log(result);
    });
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
