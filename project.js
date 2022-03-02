'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

const { CreateGoogleDirectories } = require('../../../utils/googledrive.js')

async function CreateGoogleProjectDirectories(project) {
	const result = await CreateGoogleDirectories(
		strapi.config.get('externaltools.zapierprojectdirectory'),
		project.name,
		'/projects/' + project.id,
		project.owner.id,
	)
	console.log('CreateGoogleProjectDirectories - result', result)
	return result
}

function Creategroups(project) {
	strapi
		.query('group')
		.create({ name: project.name + ' - ' + '1-Founders', project: project.id, users: [project.owner] })

	let groupstocreate = ['0-Coach', '2-Team', '3-Providers']

	for (let i = 0; i < groupstocreate.length; i++) {
		strapi.query('group').create({ name: project.name + ' - ' + groupstocreate[i], project: project.id })
	}
}

async function afterCreate(result, data) {
	if (data.owner !== undefined && data.owner > 0) await CreateGoogleProjectDirectories(result)
}

async function afterUpdate(result, params, data) {
	console.log('params', params)
	console.log('data', data)
	console.log('result', result)
	if ((result.googledirouid === undefined || result.googledirouid === null) && result.owner != null) {
		await CreateGoogleProjectDirectories(result)
	}

	if (data.creategroups !== undefined && result.owner != null && result.owner.id !== undefined) {
		Creategroups(result)
	}
}

module.exports = {
	lifecycles: {
		afterCreate,
		afterUpdate,
	},
}
