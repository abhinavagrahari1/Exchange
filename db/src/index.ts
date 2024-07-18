import {Client} from 'pg';
import {createClient} from 'redis';

const pgClient = new Client({
    user: 'exchange_admin',
    host: 'localhost',
    database: 'exchange_database',
    password: 'exchange_password',
    port: 5432
})

pgClient.connect();


async function main(){
    const redisClient = createClient();
    redisClient.connect();
    console.log("Connected to redis");

    while(true){
        const response = await redisClient.rPop("db_processor" as string);

        if(!response){

        }else{
            const data = JSON.parse(response);
            if(data.type === "TRADE_ADDED"){
                const price = data.data.price;
                const timestamp = new Date(data.data.timestamp);
                const values={timestamp, price};
                await pgClient.query("INSERT INTO tata_prices (time, price) VALUES ($1, $2)", [timestamp, values]);
            }
        }

    }
}

main();