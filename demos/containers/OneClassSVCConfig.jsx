import React from 'react';

// import {findHyperParameters} from '../actions/SVC';
import { getHyperParameters, KERNEL, getFields } from '../util/fields';
import TableConfigField from '../components/TableConfigField';
import { useFormContext, useWatch } from 'react-hook-form';

const initialValues = {
  type: SVM.SVM_TYPES.C_SVC,
};
getFields().forEach((field) => (initialValues[field.name] = field.initial));

export default function OneClassSVCConfig() {
  const { register } = useFormContext();
  const values = useWatch();

  return (
    <form>
      <table className="svm-config-table">
        <tbody>
          <tr>
            <td>
              <label htmlFor="SVC_type">Classification type</label>
            </td>
            <td>One-class SVC</td>
          </tr>
          <TableConfigField {...KERNEL} register={register} values={values} />
          {getHyperParameters('2', values.kernel).map((param) => {
            return (
              <TableConfigField
                key={param.id}
                {...param}
                register={register}
                values={values}
              />
            );
          })}
        </tbody>
      </table>
    </form>
  );
}
