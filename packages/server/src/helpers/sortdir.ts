import * as fs from 'fs'
import * as path from 'path'
import { promisify } from 'util'


const readdir = promisify(fs.readdir)
const fileStat = promisify(fs.stat)

export default async function sortdir (dir: S) {
  const files = await readdir(dir)
  const stats = await Promise.all(files.map(file => fileStat(path.join(dir, file)).then(stat => ({file, stat}))))
  return stats.sort((a, b) => a.stat.mtime.getTime() - b.stat.mtime.getTime()).map(stat => stat.file)
}
