import { PrismaClient } from "@prisma/client";
import { loginSchema } from "../validators";
import { compare } from "bcrypt-ts-edge";
import { signOut } from "@/auth";


const prisma = new PrismaClient();
export async function login(data: { email: string; password: string }) {
    try {
        // Validation with zod
        const result = loginSchema.safeParse(data);
        if (!result.success) {
            throw new Error('Datos de inicio de sesión inválidos');
        }
        // Find user by email
        const user = await prisma.user.findFirst({
            where: { email: data.email },
        });
        // Check if user exists
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        // Check if password is set
        if (!user.password) {
            throw new Error('Contraseña no establecida para el usuario');
        }
        // Compare password with hash
        const isValidPassword = await compare(data.password, user.password);

        if (!isValidPassword) {
            throw new Error('Contraseña incorrecta');
        }
        // Return user after successful login
        return user;
    } catch (error) {
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}
export async function logout() {
    try {
      
      await signOut();
      
      return { success: true };
    } catch (error) {
      throw error;
    }
  }