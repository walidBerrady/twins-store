import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    res.send("signup called");
}

export const login = async (req, res) => {
    res.send("login called");
}

export const logout = async (req, res) => {
    res.send("logout called");
}