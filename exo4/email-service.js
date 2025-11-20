const sendgrid = {
  async send({ to, subject, text }) {
    console.log('[sendgrid] Email envoyé a', to, 'Sujet:', subject);
    console.log(text);
  },
};

class MailProvider {
  async send({ to, subject, text }) {
    throw new Error('La méthode send doit etre implémentée par la classe concrete.');
  }
}

class SendgridMailProvider extends MailProvider {
  async send({ to, subject, text }) {
    await sendgrid.send({ to, subject, text });
  }
}

class FakeMailProvider extends MailProvider {
  async send({ to, subject, text }) {
    console.log('[FakeMailProvider] Simulation d\'envoi email a', to, 'Sujet:', subject);
    console.log(text);
  }
}

class EmailService {
  constructor(mailProvider) {
    this.mailProvider = mailProvider;
  }

  async sendWelcomeEmail(user) {
    const subject = 'Bienvenue sur notre plateforme';
    const text = `Bonjour ${user.firstName},

Merci pour votre inscription.

A bientot !`;

    await this.mailProvider.send({
      to: user.email,
      subject,
      text,
    });
  }
}


const user = { firstName: 'Kenan', email: 'kenan@example.com' };

console.log('\n--- Utilisation Production (Sendgrid) ---');
const prodMailProvider = new SendgridMailProvider();
const prodEmailService = new EmailService(prodMailProvider);
prodEmailService.sendWelcomeEmail(user);

console.log('\n--- Utilisation Test (Fake) ---');
const fakeMailProvider = new FakeMailProvider();
const testEmailService = new EmailService(fakeMailProvider);
testEmailService.sendWelcomeEmail(user);