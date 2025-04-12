import prisma from "../config/db.config.js";
class ChatsController {
    static async index(req, res) {
        const { groupId } = req.params;
        const chats = await prisma.chats.findMany({
            where: {
                group_id: groupId,
            },
        });
        res.json({ data: chats });
        return;
    }
}
export default ChatsController;
