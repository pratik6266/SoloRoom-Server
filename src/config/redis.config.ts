import {Redis} from 'ioredis';
const redis = new Redis(process.env.REDIS_URL)
console.log("redis: ", redis)
export default redis