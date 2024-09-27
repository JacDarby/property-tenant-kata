import * as assert from 'assert/strict';
import {before, describe, test} from 'node:test';
import {GetInvalidPostcodePropertiesService} from '../services/getInvalidPostcodeProperties';
import {csvPropertyRepository} from '../repositories/csvRepositories/csvPropertyRepository';

describe('Task 3: getInvalidPostcodePropertiesService', () => {
  let getInvalidPostcodePropertyIdsService: GetInvalidPostcodePropertiesService;
  before(() => {
    getInvalidPostcodePropertyIdsService =
      new GetInvalidPostcodePropertiesService(csvPropertyRepository);
  });
  test('Returns an array of invalid postcodes', async () => {
    const result =
      await getInvalidPostcodePropertyIdsService.getInvalidPostcodePropertyIds();
    assert.strictEqual(result.length, 39);
  });
  test('All returned items are invalid against api', async () => {
    const result =
      await getInvalidPostcodePropertyIdsService.getInvalidPostcodePropertyIds();
    assert.deepEqual(result, [
      'p_1005',
      'p_1008',
      'p_1011',
      'p_1013',
      'p_1018',
      'p_1020',
      'p_1025',
      'p_1031',
      'p_1036',
      'p_1037',
      'p_1041',
      'p_1047',
      'p_1049',
      'p_1052',
      'p_1053',
      'p_1059',
      'p_1060',
      'p_1061',
      'p_1065',
      'p_1067',
      'p_1071',
      'p_1072',
      'p_1075',
      'p_1077',
      'p_1080',
      'p_1083',
      'p_1084',
      'p_1085',
      'p_1086',
      'p_1087',
      'p_1088',
      'p_1090',
      'p_1092',
      'p_1095',
      'p_1096',
      'p_1097',
      'p_1098',
      'p_1100',
      'p_1101',
    ]);
  });
});
