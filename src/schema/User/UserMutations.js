import {
	GraphQLString,
	GraphQLInt,
	GraphQLBoolean,
	GraphQLError

} from 'graphql';
import {
	userInputType,
	userTypes,
	loginInputType
} from './UserType';
import UserModel from './UserSchema';
import jwt from "jsonwebtoken";
import _ from 'lodash';
const bcrypt = require("bcrypt");



export default {
	useradd: {
		type: userTypes,
		args: {

			name: {
				name: 'name',
				type: GraphQLString
			},

			email: {
				name: 'email',
				type: GraphQLString
			},

			role: {
				name: 'role',
				type: GraphQLInt
			},
			password: {
				name: 'password',
				type: GraphQLString
			},

		},
		resolve: UserModel.adduser
	},


	Login: {
		type: GraphQLBoolean,
		args: {
			email: {
				name: 'email',
				type: GraphQLString
			},
			password: {
				name: "password",
				type: GraphQLString
			},
		},
		resolve(root, args, context) {
			return new Promise((resolve, reject) => {
				UserModel.findOne({
					email: args.email
				}).exec((err, res) => {


					if (err) {
						resolve(false)
					}
					if (!res) {
						resolve(false)
						return false
					}

					bcrypt.compare(args.password, res.password, (err, result) => {
						if (err) {
							resolve(false)
						}
						if (result == true) {
							const Token = jwt.sign({
								user: _.pick(res, ['_id', 'role'])
							}, context.secret, {
								expiresIn: '1h'
							})
							const RefreshToken = jwt.sign({
								user: _.pick(res, '_id')
							}, context.secret_2, {
								expiresIn: '7d'
							})
							context.res.cookie('token', Token, {
								maxAge: 60 * 60 * 24 * 7,
								httpOnly: true
							});
							context.res.cookie('refresh-token', RefreshToken, {
								maxAge: 60 * 60 * 24 * 7,
								httpOnly: true
							});
							resolve(true)
						}
						else{
							resolve(false)
						}

					})







					// else if (res.password != args.password) {
					// 	console.log('password incorrect');
					// 	resolve(false)
					// 	return false

					// }


					// const Token = jwt.sign({
					// 	user: _.pick(res, ['_id', 'role'])
					// }, context.secret, {
					// 	expiresIn: '1h'
					// })
					// const RefreshToken = jwt.sign({
					// 	user: _.pick(res, '_id')
					// }, context.secret_2, {
					// 	expiresIn: '7d'
					// })

					// context.res.cookie('token', Token, {
					// 	maxAge: 60 * 60 * 24 * 7,
					// 	httpOnly: true
					// });
					// context.res.cookie('refresh-token', RefreshToken, {
					// 	maxAge: 60 * 60 * 24 * 7,
					// 	httpOnly: true
					// });

					// console.log('context.req.cookie', context.req.cookies)

					// resolve(true)


				});

			})

		}
	}




};