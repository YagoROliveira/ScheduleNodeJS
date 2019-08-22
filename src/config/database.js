module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'docker',
  password: 'docker',
  databse: 'barbearia',
  operatorAliases: false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true
  }
}
