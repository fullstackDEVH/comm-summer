import authRouter from './authRouter';
import cartRouter from './cartRouter';
import userRouter from "./userRouter";
import orderRouter from "./orderRouter";
import checkoutRouter from "./checkoutRouter";
import productRouter from "./productRouter";
import stripeRouter from "./stripeRouter";

const routers = (app)=>{
    app.use('/api/auth', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/products', productRouter);
    app.use('/api/carts', cartRouter);
    app.use('/api/orders', orderRouter);
    app.use('/api/checkout', checkoutRouter);
    app.use('/api/stripe', stripeRouter);
}

export default routers;