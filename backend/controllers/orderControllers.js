import asyncHandler from 'express-async-handler';

import Order from '../models/orderModel.js';

/**
 ** Create New Order
 *
 *  @route   POST /api/orders
 *  @access  Private
 */
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order exist, please try again.');
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        });

        const createdOrder = await order.save();

        res.status(201).json(createdOrder);
    }
});

/**
 ** Get order by ID
 *
 *  @route   GET /api/orders/:id
 *  @access  Private
 */
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (order && (req.user.isAdmin || order.user._id.equals(req.user._id))) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Error Occurred. Order not found.');
    }
});

/**
 ** Update order to Paid
 *
 *  @route   PUT /api/orders/:id/pay
 *  @access  Private
 */
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        };

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Error Occurred. Order not found.');
    }
});

/**
 ** Get logged in user orders
 *
 *  @route   PUT /api/orders/myorders
 *  @access  Private
 */
const getMyOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });

    res.json(orders);
});

/**
 ** Get all orders
 *
 *  @route   GET /api/orders
 *  @access  Private/Admin
 */
const getOrdersForAdmin = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');

    res.json(orders);
});

/**
 ** Update order to delivered
 *
 *  @route   GET /api/orders/:id/deliver
 *  @access  Private
 */
const updateOrderToDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Error Occurred. Order not found.');
    }
});

/**
 ** Delete order
 *
 *  @route   DELETE /api/orders/:id
 *  @access  Private/Admin
 */
 const deleteOrderForAdmin = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        await order.remove();
        res.json({ message: 'Order Deleted.' });
    } else {
        res.status(404);
        throw new Error('Error Occurred. Order not found.');
    }
});


export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    getMyOrders,
    getOrdersForAdmin,
    updateOrderToDelivered,
    deleteOrderForAdmin
};
