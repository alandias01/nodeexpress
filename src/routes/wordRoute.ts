import { Router } from 'express';
import WordDao from './../daos/wordDao';

/* How This routing works
 * Idea is to create a Data access object like wordDao and map it to a path
   Thats all you do here, rest of the logic is done in wordDao (Look in there)
 */

const wordRouter = Router();
const wordDao = new WordDao();

wordRouter.get('/getAll', async (req, res) => {
  try {
    const data = await wordDao.getAll();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error getting words', error: err });
  }
});

wordRouter.post('/get/', async (req, res) => {
  try {
    const data = await wordDao.get(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error getting words', error: err });
  }
});

wordRouter.get('/get/:id', async (req, res) => {
  try {
    const data = await wordDao.getById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Error getting word by id', error: err });
  }
});

wordRouter.post('/add/', async (req, res) => {
  try {
    const data = await wordDao.add(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ message: 'Error inserting word', error: err });
  }
});

wordRouter.post('/update', async (req, res) => {
  try {
    const data = await wordDao.update(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: 'Error updating word', error: err });
  }
});

wordRouter.post('/delete', async (req, res) => {
  try {
    const data = await wordDao.delete(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ message: 'Error deleting word', error: err });
  }
});

wordRouter.get('/test/', (req, res) => res.json(req.query)); //http://localhost:3001/api/words/test?a=b&c=d
wordRouter.get('/test/:year/:month/:day', (req, res) => res.json(req.params)); //http://localhost:3001/api/words/test/2020/04/19

wordRouter.get('/test/:id', (req, res) => {
  const arr = [1, 2, 3, 4, 5];
  const result = arr.find(x => x === parseInt(req.params.id));
  if (!result) res.status(404).send(`Couldn't find ${req.params.id}`);
  res.json(`Found ${result}`);
}); //http://localhost:3001/api/words/test/1

export default wordRouter;
