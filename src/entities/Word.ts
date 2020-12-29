import mongoose, { Schema } from 'mongoose';

export interface IWord {
  word: string;
  definition: string;
  partOfSpeech: string;
}

export class Word implements IWord {
  word: string;
  definition: string;
  partOfSpeech: string;

  constructor(word: string | IWord, definition?: string, partOfSpeech?: string) {
    if (typeof word === 'string') {
      this.word = word;
      this.definition = definition || '';
      this.partOfSpeech = partOfSpeech || '';
    } else {
      this.word = word.word;
      this.definition = word.definition;
      this.partOfSpeech = word.partOfSpeech;
    }
  }
}

const wordSchema = new Schema({
  word: { type: String, required: true },
  definition: { type: String, default: null },
  partOfSpeech: { type: String, default: '' },
});

export const wordMongooseModel = mongoose.model('words', wordSchema, 'words');
