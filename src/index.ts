import 'reflect-metadata';
import express from 'express';
import { DataSource } from 'typeorm';
import { User } from './entity/User';
import { Post } from './entity/Post';

const app = express();
app.use(express.json());

const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "test_db",
  entities: [User,Post],
  synchronize: true,
});

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const initializeDatabase = async () => {
  await wait(20000);
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (err) {
    console.error("Error during Data Source initialization:", err);
    process.exit(1);
  }
};

initializeDatabase();

app.post('/users', async (req, res) => {
  // Crie o endpoint de users
  const userRepository = AppDataSource.getRepository(User);
  const { firstName, lastName, email } = req.body
  const newUser = new User(firstName, lastName, email);
  
  try {
      
    await userRepository.save(newUser)
    res.status(201).json(newUser);
  
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user" });
  }
  
});
  
app.post('/posts', async (req, res) => {
  // Crie o endpoint de posts
  const postRepository = AppDataSource.getRepository(Post);
  const { title, description, userId } = req.body
  const newPost = new Post(title, description, userId);  
  
  try {
  
    await postRepository.save(newPost)
    res.status(201).json(newPost);
  
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ message: "Error saving post" });
  }
    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
