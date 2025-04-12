import prisma from "../config/db.config.js";
class ChatGroupUserController {
    static async index(req, res) {
        try {
            const { group_id } = req.query;
            const users = await prisma.groupUsers.findMany({
                where: {
                    group_id: group_id,
                },
            });
            res.json({ message: "Data fetched successfully!", data: users });
            return;
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Something went wrong.please try again!" });
            return;
        }
    }
    static async store(req, res) {
        try {
            const body = req.body;
            const user = await prisma.groupUsers.create({
                data: body,
            });
            res.json({ message: "User created successfully!", data: user });
            return;
        }
        catch (error) {
            res
                .status(500)
                .json({ message: "Something went wrong.please try again!" });
            return;
        }
    }
}
export default ChatGroupUserController;
