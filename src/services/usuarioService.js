const User = require('../models/usuario');
const Empresa = require('../models/empresa');
const Cliente = require('../models/cliente');
const Pedido = require('../models/pedido');
const Produto = require('../models/produto');

class UsuarioService {
    async registerUser({ name, email, password }) {
        const existingUser = await User.findOne({ email });
        if (existingUser) throw new Error('Email já registrado');

        const user = await User.create({ name, email, password });
        const token = user.generateAuthToken();

        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }

    async loginUser({ email, password }) {
        const user = await User.findOne({ email }).select('+password');
        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Credenciais inválidas');
        }

        const token = user.generateAuthToken();

        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }

    async updateUser(id, data) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        Object.assign(user, data);

        await user.save();

        return {
            message: 'Usuário atualizado com sucesso',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }

    async updateUserRole(userId, newRole) {
        const validRoles = ['user', 'admin', 'superadmin'];
        if (!validRoles.includes(newRole)) {
            throw new Error('Papel (role) inválido');
        }

        const user = await User.findById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        user.role = newRole;
        await user.save();

        return {
            message: `Papel do usuário atualizado para ${newRole}`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }

    async deleteUser(id, cascade = false) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        if (cascade) {
            const empresas = await Empresa.find({ usuario: id });

            for (const empresa of empresas) {
                await Cliente.deleteMany({ empresa: empresa._id });
                await Pedido.deleteMany({ empresa: empresa._id });
                await Produto.deleteMany({ empresa: empresa._id });
            }

            await Empresa.deleteMany({ usuario: id });
        }

        const result = await User.deleteOne({ _id: id });

        if (result.deletedCount === 0) {
            throw new Error('Erro ao deletar o usuário');
        }

        return {
            message: cascade
                ? 'Usuário e dados relacionados deletados com sucesso'
                : 'Usuário deletado com sucesso',
            deletedId: id
        };
    }
}

module.exports = new UsuarioService();