import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
	const client = await MongoClient.connect(
    	'mongodb+srv://next-test:showgirlwang588@cluster0.wezodmd.mongodb.net/Next?retryWrites=true&w=majority'
	);
	return client;
}