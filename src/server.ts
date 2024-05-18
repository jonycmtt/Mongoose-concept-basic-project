import mongoose from 'mongoose';
// import config from './app/config';
import app from './app';

const port = 3000;

async function main() {
  try {
    await mongoose.connect(
      'mongodb+srv://admin-um:admin-um884422@cluster0.jsqvega.mongodb.net/project01?retryWrites=true&w=majority&appName=Cluster0' as string,
    );
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
