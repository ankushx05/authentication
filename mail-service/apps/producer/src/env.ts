declare module "bun" {
  interface Env {
    Rabbitmq_HOST: string;
    Rabbitmq_PORT: number;
    Rabbitmq_USERNAME: string;
    Rabbitmq_PASSWORD: string;
  }
}
