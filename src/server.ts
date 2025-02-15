import app from "./app";
import { connectDB } from "./database";

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Estamos online chefe escutando na porta ${PORT}`);
  });
}).catch((e) => {
  console.error("erro ao conectar ao banco", e)
})

export default app
