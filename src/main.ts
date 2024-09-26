import { Hono, Context } from "hono";
import "dotenv/config";
import { serve } from '@hono/node-server';
import patientsRouter from './patients/Patients.router'
import paymentsRouter from "./Payments/payments.router";
import billingRouter from "./Billing/Billing.router";
import departmentsRouter from "./Departments/department.router";
import inventoryRouter from "./Inventory/Inventory.router";
import labTestsRouter from "./Labtests/Labtests.router";
import medicalRecordRouter from "./Medical Records/Medicalrecords.router";
import schedulesRouter from "./Schedules/schedules.router";
import usersRouter from "./Users/users.router";
import messagesRouter from "./Messages/Messages.router";
import supportTicketsRouter from "./CustomerSupport/customersupport.router";
import authRouter from "./Authentication/Auth.router"; 



// Default route
const app = new Hono().basePath("/api");

app.get('/', (c: Context) => {
    const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Drizzle Restaurant DB</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    background-color: #f0f0f0;
                }
                .container {
                    text-align: center;
                    padding: 50px;
                    background-color: #fff;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                    border-radius: 8px;
                }
                h1 {
                    color: #333;
                }
                p {
                    color: #666;
                }
                .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    margin-top: 20px;
                    color: #fff;
                    background-color: #007bff;
                    border: none;
                    border-radius: 5px;
                    text-decoration: none;
                    font-size: 16px;
                    transition: background-color 0.3s;
                }
                .btn:hover {
                    background-color: #0056b3;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>CEO Kiptoo Mannu Welcomes You to Drizzle Restaurant DB</h1>
                <p>Your favorite place to manage restaurant data efficiently.</p>
                <a href="/api/ok" class="btn">Check Status</a>
            </div>
        </body>
        </html>
    `;
    return c.html(htmlContent);
});

app.get('/ok', (c: Context) => {
    return c.text('Server running');
});


app.route ("/" , billingRouter)
app.route ("/" , departmentsRouter)
app.route ("/" , inventoryRouter)
app.route ("/" ,  labTestsRouter)
app.route ("/" , medicalRecordRouter)
app.route ("/"  , patientsRouter)
app.route("/", paymentsRouter);
app.route('/', schedulesRouter);
app.route('/', usersRouter);
app.route('/' , messagesRouter)
app.route ('/' , supportTicketsRouter)
app.route ('/' ,authRouter )

console.log('Routes registered:', app.routes);



serve({
    fetch: app.fetch,
    port: 8000
});

console.log(`Server is running at port 8000`);
