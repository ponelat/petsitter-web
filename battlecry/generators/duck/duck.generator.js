import { Generator, File, namedCasex, casex, log } from 'battlecry';

const CONFIG_FILE = 'configureStore.ts';
const REDUX_PATH = 'src';

export default class DuckGenerator extends Generator {
  config = {
    init: {
      description: 'Create configStore.js file and an example duck'
    },
    generate: {
      args: 'name ...actions?',
      description: 'Create or modify duck to add actions'
    }
  };

  get configFile() {
    const template = this.template(CONFIG_FILE);
    const path = `${REDUX_PATH}/${template.filename}`;

    return new File(path);
  }

  get actions() {
    return (this.args.actions || ['set']).reverse();
  }

  init() {
    const configFile = this.configFile;
    if(configFile.exists) return log.warn(`Modular ducks have already been initiated. Please check the ${configFile.path} file`);

    this.template(CONFIG_FILE).saveAs(configFile.path);
    this.generator('duck').setArgs({name: 'todo'}).play('generate');
  }

  generate() {
    this.addDuckToConfig();
    this.addActionsToDuck();
  }

  addActionsToDuck() {
    const template = this.template('_*');
    const path = `${REDUX_PATH}/duck-${template.filename}`;

    let file = new File(path, this.args.name);
    if(!file.exists) file = template;

    this.actions.forEach(action => {
      let isAsync = false
      if(action[0] === '@') {
        action = action.slice(1)
        isAsync = true
      }

      if(!isAsync) {
        file.after('// Actions', `const __NA_ME__ = '${casex(this.args.name, 'na-me')}/__NA-ME__';`, action);

        file.after('switch (action.type) {', [
          '    case __NA_ME__:',
          '      // Perform action',
          '      return state;'
        ], action);
      }

      // Sync
      let fnBody = isAsync ? (
        '  return (dispatch) => {\n' +
        '\n' +
        '  }'
      ) : (
        '  return { type: __NA_ME__ };'
      )

      file.after('// Action Creators', [
        namedCasex('export function __naMe__() {', + `${action}_${this.args.name}`),
        fnBody,
        '}',
        ''
      ], action);
    });

    file.saveAs(path, this.args.name);
  }

  addDuckToConfig() {
    let file = this.configFile;
    if(!file.exists) return null;

    const template = this.template('_*');
    const templateFile = new File(`${REDUX_PATH}/duck-${template.filename}`, this.args.name);
    if(templateFile.exists) return null;

    file
      .afterLast('import ', "import __naMe__ from './duck-__naMe__'", this.args.name)
      .after('combineReducers({', '  __naMe__,', this.args.name)
      .save();
  }
}
