import Star from "../models/Star.model";
import RepositoryService from "../service/Repository.service";

const repositoryService = new RepositoryService();

class StarService {
  async star(userId: number, repositoryId: number) {
    const existsRepo = await repositoryService.hasRepositoryById(repositoryId);

    if (!existsRepo) return { error: ["O repositório não existe"] };

    if (await this.existsLike(userId, repositoryId))
      return { error: ["Você já deu star nesse repositório"] };

    const star = await Star.create({
      user_id: userId,
      repository_id: repositoryId,
    });

    return { data: star, count: 1 };
  }

  async unstar(userId: number, repositoryId: number) {
    const existsRepo = await repositoryService.hasRepositoryById(repositoryId);

    if (!existsRepo) return { error: ["O repositório não existe"] };

    if (!(await this.existsLike(userId, repositoryId)))
      return { error: ["Você ainda não deu star nesse repositório"] };

    await Star.destroy({
      where: { user_id: userId, repository_id: repositoryId },
    });

    return { message: "unlike realizado com sucesso" };
  }

  private async existsLike(userId: number, repositoryId) {
    const existsLike = await Star.findOne({
      where: { user_id: userId, repository_id: repositoryId },
    });

    if (!existsLike) return false;
    return true;
  }
}

export default StarService;
