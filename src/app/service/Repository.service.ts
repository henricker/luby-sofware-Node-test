import Repository from "../models/Repository.model";
import { IRepositoryDTO } from "./DTO/CreateRepository.dto";
import UserService from "../service/User.service";

const userService = new UserService();

class RepositoryService {
  async create({ description, name, publicRepo, user_id }: IRepositoryDTO) {
    const nameUser = (await userService.getUser(user_id))["data"][0][
      "name"
    ].replace(" ", "-");

    const slug = `${nameUser}-${name}`;

    if (await this.hasRepository(name))
      return { error: ["Já existe um repositório com esse nome"] };

    const repository = (
      await Repository.create({
        description,
        name,
        public: publicRepo,
        slug,
        user_id,
      })
    ).toJSON();

    repository["createdAt"] = undefined;
    repository["updatedAt"] = undefined;
    repository["userId"] = undefined;

    return { data: repository, count: 1 };
  }

  async update(
    id: number,
    { description, name, publicRepo, user_id }: IRepositoryDTO
  ) {
    const nameUser = (await userService.getUser(user_id))["data"][0][
      "name"
    ].replace(" ", "-");

    const slug = `${nameUser}-${name}`;

    if (!(await this.hasRepositoryById(id)))
      return { error: ["Repositório não encontrado"] };

    if (!(await this.userHasRepository(user_id, id)))
      return { error: ["Você não é o dono desse repositório"] };

    await Repository.update(
      {
        description,
        name,
        public: publicRepo,
        slug,
        user_id,
      },
      {
        where: { id },
      }
    );

    return { message: "Repositório atualizado com sucesso" };
  }

  async getBySlug(slug: string) {
    const repository = await Repository.findOne({
      where: { slug },
      attributes: {
        exclude: [
          "createdAt",
          "created_at",
          "updatedAt",
          "updated_at",
          "userId",
        ],
      },
    });

    if (!repository)
      return { error: "Não existe um repositório com esse slug" };

    return { data: repository.toJSON(), count: 1 };
  }

  async delete(id: number, userId: number) {
    if (!(await this.hasRepositoryById(id)))
      return { error: "O repósitório já não existe" };

    if (!(await this.userHasRepository(userId, id)))
      return { error: ["Você não é o dono desse repositório"] };

    await Repository.destroy({ where: { id } });

    return { message: "Repositório deletado com sucesso" };
  }

  async getByUserId(userId: number) {
    const repositories = (
      await Repository.findAll({ where: { user_id: userId } })
    ).map(repository => {
      const repo = repository.toJSON();
      repo['createdAt'] = undefined;
      repo['updatedAt'] = undefined;
      repo['user_id'] = undefined;

      return repo;
    });

    return { data: repositories, count: repositories.length };
  }

  private async hasRepository(name: string) {
    const exists = await Repository.findOne({ where: { name } });

    if (exists) return true;

    return false;
  }

  private async hasRepositoryById(id: number) {
    const exists = await Repository.findOne({ where: { id } });

    if (exists) return true;

    return false;
  }

  private async userHasRepository(userId: number, repositoryId: number) {
    const userHasRepo = await Repository.findOne({
      where: { user_id: userId, id: repositoryId },
    });

    if (!userHasRepo) return false;
    return true;
  }
}

export default RepositoryService;
