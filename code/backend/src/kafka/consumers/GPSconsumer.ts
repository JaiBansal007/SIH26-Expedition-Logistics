// consumer.js
import { Kafka, EachMessagePayload } from 'kafkajs';
import 'dotenv/config';
import { insertGpsData } from '../../controller/Gpsfetcher'; // adjust path if needed
import { processAllAlerts } from '../../Alerts_types/alertProcessor'; // Import alert processor
import { db } from "../../db/connection";

const kafka = new Kafka({
  clientId: 'gps-consumer',
  brokers: [process.env.KAFKA_BROKER || 'localhost:9092']
});
const consumer = kafka.consumer({ groupId: 'api-group' });
const topic = process.env.KAFKA_TOPIC!;


export async function GPSConsumer() {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }: EachMessagePayload) => {
      try {
        if(message.value?.toString() === " ") {
          console.log('No data received from API');
          return;
          }
        // Parse GPS data
        const data = JSON.parse(message.value!.toString());
        
        // Insert GPS data first
        await insertGpsData(data);
        
        // After successful GPS data insertion, process all alerts
        console.log('📡 GPS data inserted, now processing alerts...');
        await processAllAlerts();
        
      } catch (err) {
        console.error('❌ JSON parse error or DB error:', err);
        // Even if alert processing fails, we don't want to stop GPS processing
      }
    },
  });
}
