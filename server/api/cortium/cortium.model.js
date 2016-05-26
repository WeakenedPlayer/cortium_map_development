'use strict';

export default function(sequelize, DataTypes) {
	return sequelize.define('Cortium', {
		_id: {
		    type : DataTypes.INTEGER.UNSIGNED,
		    allowNull: false,
		    primaryKey: true,
		    autoIncrement: true
		}, 
		// 大陸 (今後増えたら修正)
		continent : {
			type : DataTypes.INTEGER.UNSIGNED,
			allowNull : false,
		    validate: { min: 0, max: 3 },
		},
		lat : {
			type : DataTypes.DOUBLE,
			allowNull: false,
		    validate: { min: -1.0, max: 0.0 },
		},
		lng : {
			type : DataTypes.DOUBLE,
			allowNull: false,
		    validate: { min: 0.0, max: 1.0 },
		},
		// cortiumの大きさ(今後増えたら修正)
		grade : {
		    type : DataTypes.INTEGER.UNSIGNED,
		    allowNull: false,
		    validate: { min: 0, max: 2 },
		}
	});
}
