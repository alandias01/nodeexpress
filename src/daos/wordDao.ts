import mongoose, { Document } from 'mongoose';
import { IBaseDao } from './IBaseDao';
import { wordMongooseModel } from './../entities/Word';

/* When starting a project, we are given IBaseDao<T>
 * Steps to take to create your project...
 * Create new interface that extends IBaseDao<T>, like IWordDao so you can have any extra
 * methods to return something more specific.  The basics like getall and getById are already provided
 * The return type should be specific to the DB you are using.  We are using mongoose so we return Document
 * So that will be the type for <T>
 */

let wordModel = wordMongooseModel;

interface IWordDao extends IBaseDao<Document> {}

export default class WordDao implements IWordDao {
  getAll = (): Promise<Document[]> => {
    return new Promise<Document[]>(async (res, rej) => {
      try {
        const result = await wordModel.find();
        res(result);
      } catch (error) {
        rej(error);
      }
    });
  };

  get = (where: {}): Promise<Document[]> => {
    return new Promise<Document[]>(async (res, rej) => {
      try {
        const result = await wordModel.find(where);
        res(result);
      } catch (error) {
        rej(error);
      }
    });
  };

  getById = (id: any): Promise<mongoose.Document> => {
    return new Promise<mongoose.Document>(async (res, rej) => {
      try {
        const result = await wordModel.findById(id);
        res(result);
      } catch (error) {
        rej(error);
      }
    });
  };

  add = (add: Document): Promise<Document> => {
    return new Promise<Document>(async (res, rej) => {
      try {
        const wordModelInstance = new wordModel(add);
        const result = await wordModelInstance.save();
        res(result);
      } catch (error) {
        rej(error);
      }
    });
  };

  update = (update: Document): Promise<Document> => {
    return new Promise<Document>(async (res, rej) => {
      try {
        const wordModelInstance = await wordModel.findById(update._id);
        wordModelInstance.definition = update.definition;
        wordModelInstance.partOfSpeech = update.partOfSpeech;
        const result = await wordModelInstance.save();
        res(result);
      } catch (error) {
        rej(error);
      }
    });
  };

  delete = (itemToDelete: Document): Promise<Document> => {
    return new Promise<Document>(async (res, rej) => {
      try {
        const result = await wordModel.findByIdAndDelete(itemToDelete._id);
        res(result);
      } catch (error) {
        rej(error);
      }
    });
  };
}
