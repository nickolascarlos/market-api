import Translator, { languages } from './translator';

const translator = new Translator(languages.pt_br);

//
translator.addTranslation('seconds', 'segundos');
translator.addTranslation('User not found', 'Usuário não encontrado');
translator.addTranslation(
  'Provided token is not valid or was already used',
  'O token informado não é válido ou já foi utilizado',
);
translator.addTranslation(
  'Provided token is expired',
  'O token informado expirou',
);
translator.addTranslation(
  'A user must be specified',
  'Um usuário deve ser especificado',
);
translator.addTranslation(
  'Provided email is not valid',
  'O email informado não é válido',
);
translator.addTranslation(
  'No service group with such id',
  'Não existe grupo de serviço com o id informado',
);
translator.addTranslation(
  'No service category with such id',
  'Não existe categoria de serviço com o id informado',
);
translator.addTranslation(
  'No service with such id',
  'Não existe serviço com o id informado',
);
translator.addTranslation(
  'This service does not belong to the logged-in user',
  'Esse serviço não pertence ao usuário logado',
);
translator.addTranslation(
  'No provider with such id',
  'Não existe provedor com o id informado',
);
translator.addTranslation(
  'Provider does not belong to logged-in user',
  'O provedor não pertence ao usuário logado',
);
translator.addTranslation('Invalid credentials', 'Credenciais inválidas');
translator.addTranslation(
  'Such apiName is already in use',
  'Esse apiName já está sendo utilizado',
);
translator.addTranslation(
  'Email is already in use',
  'Este email já está sendo utilizado',
);
translator.addTranslation(
  'This field should not exist',
  'Este campo não deveria existir',
);
translator.addTranslation(
  'No such service category with id {#}',
  'Não existe categoria de serviço com o id {0}',
);
translator.addTranslation(
  'No such service group with id {#}',
  'Não existe grupo de serviço com o id {0}',
);
translator.addTranslation(
  '{#} must be a valid ISO date string: yyyy-mm-dd',
  '{0} deve estar no seguinte formato:  aaaa-mm-dd',
);
translator.addTranslation(
  'As date is provided, a timezone is needed',
  'Como uma data foi informada, uma timezone também deve ser informada',
);
translator.addTranslation(
  'The category cannot be updated',
  'A categoria não pode ser atualizada',
);

// Função utilitária para tradução
const __ = (str) => translator.translateError(str) || str;

export default translator;
export { __ };
