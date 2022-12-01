import fs from 'fs/promises';

export async function getInput(file) {
  try {
    const data = await fs.readFile(file, { encoding: 'utf8' });
    return data;
  } catch (err) {
    console.log(err);
  }
}