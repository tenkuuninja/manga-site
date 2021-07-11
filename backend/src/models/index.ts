import sequelize from '../configs/mysql.connect';

require('./manga.model');
require('./chapter.model');
require('./comment.model');
require('./genre.model');
require('./user.model');
require('./role.model');
require('./manga_readed.model');

const models: any = sequelize.models;

for (let model in models) {
  if (models[model].associate) models[model].associate();
  if (models[model].defineScope) models[model].defineScope();
  if (models[model].defineHook) models[model].defineHook();
}

export default sequelize;
