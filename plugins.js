module.exports = ({ env }) => ({
	upload: {
		provider: 'aws-s3',
		providerOptions: {
			accessKeyId: env('AWS_ACCESS_KEY_ID'),
			secretAccessKey: env('AWS_ACCESS_SECRET'),
			region: 'aws-region',
			params: {
				Bucket: 'my-bucket',
			},
		},
	},

	email: {
		provider: 'nodemailer',
		providerOptions: {
		  host: env('SMTP_HOST', 'smtp.gmail.com'),
		  port: env('SMTP_PORT', 465),
		  auth: {
			user: env('SMTP_USERNAME', 'myctofriend@myctofriend.co'),
			pass: env('SMTP_PASSWORD', 'W5%ed6Dh'),
		  },
		  // ... any custom nodemailer options
		},
		settings: {
		  defaultFrom: 'myctofriend@myctofriend.co',
		  defaultReplyTo: 'myctofriend@myctofriend.co',
		},
	  },

	// email: {
	// 	config: {
	// 	  provider: 'nodemailer',
	// 	  providerOptions: {
	// 		host: 'smtp.gmail.com',
	// 		port: 465,
	// 		auth: {
	// 		  user: 'myctofriend@myctofriend.co',
	// 		  pass: 'W5%ed6Dh',
	// 		},
	// 	  },
	// 	  settings: {
	// 		defaultFrom: 'myctofriend@myctofriend.co',
	// 		defaultReplyTo: 'myctofriend@myctofriend.co',
	// 	  },
	// 	},
	//   },
})
