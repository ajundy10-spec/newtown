import { z } from "zod";

// Auth validation schemas
export const signUpSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }).max(100, { message: "Password must be less than 100 characters" }),
  fullName: z.string().trim().min(1, { message: "Full name is required" }).max(100, { message: "Full name must be less than 100 characters" }),
});

export const signInSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
  password: z.string().min(1, { message: "Password is required" }).max(100, { message: "Password must be less than 100 characters" }),
});

export const passwordResetSchema = z.object({
  email: z.string().trim().email({ message: "Invalid email address" }).max(255, { message: "Email must be less than 255 characters" }),
});

// Product validation schemas
export const productSchema = z.object({
  name: z.string().trim().min(1, { message: "Product name is required" }).max(100, { message: "Product name must be less than 100 characters" }),
  description: z.string().trim().min(1, { message: "Description is required" }).max(500, { message: "Description must be less than 500 characters" }),
  price: z.number().min(0.01, { message: "Price must be at least $0.01" }).max(9999.99, { message: "Price must be less than $10,000" }),
  image_url: z.string().trim().url({ message: "Invalid image URL" }).max(500, { message: "Image URL must be less than 500 characters" }),
  category: z.string().trim().min(1, { message: "Category is required" }).max(50, { message: "Category must be less than 50 characters" }),
  subcategory: z.string().trim().min(1, { message: "Subcategory is required" }).max(50, { message: "Subcategory must be less than 50 characters" }),
});

// Notification validation schemas
export const notificationSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }).max(100, { message: "Title must be less than 100 characters" }),
  message: z.string().trim().min(1, { message: "Message is required" }).max(500, { message: "Message must be less than 500 characters" }),
});
