import dotenv from "dotenv";
import * as Brevo from "@getbrevo/brevo";
dotenv.config();

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY as string
);

export const sendMail = async (to: string, name: string) => {
  try {
    const response = await apiInstance.sendTransacEmail({
      to: [{ email: to, name }],
      templateId: 1,
      params: {deal_name: name},
      sender: {
        email: "noreply@kofiby.com",
        name: "Kofiby",
      },
      
    });
  } catch (error) {
    console.error("❌ Error al enviar correo:", error);
  }
};
