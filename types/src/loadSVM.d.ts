export default function loadSVM(libsvm: any): {
    new (options: {
        type?: number;
        kernel?: number;
        degree?: number;
        gamma?: number;
        coef0?: number;
        cost?: number;
        nu?: number;
        epsilon?: number;
        cacheSize?: number;
        tolerance?: number;
        shrinking?: boolean;
        probabilityEstimates?: boolean;
        weight?: object;
        quiet?: boolean;
    }): {
        options: {
            type?: number;
            kernel?: number;
            degree?: number;
            gamma?: number;
            coef0?: number;
            cost?: number;
            nu?: number;
            epsilon?: number;
            cacheSize?: number;
            tolerance?: number;
            shrinking?: boolean;
            probabilityEstimates?: boolean;
            weight?: object;
            quiet?: boolean;
        };
        model: any;
        /**
         * Trains the SVM model.
         * @param {Array<Array<number>>} samples - The training samples. First level of array are the samples, second
         * level are the individual features
         * @param {Array<number>} labels - The training labels. It should have the same size as the samples. If you are
         * training a classification model, the labels should be distinct integers for each class. If you are training
         * a regression model, each label should be the value of the predicted variable.
         * @throws if SVM instance was instantiated from SVM.load.
         */
        train(samples: Array<Array<number>>, labels: Array<number>): void;
        problem: any;
        /**
         * Performs k-fold cross-validation (KF-CV). KF-CV separates the data-set into kFold random equally sized partitions,
         * and uses each as a validation set, with all other partitions used in the training set. Observations left over
         * from if kFold does not divide the number of observations are left out of the cross-validation process. If
         * kFold is one, this is equivalent to a leave-on-out cross-validation
         * @param {Array<Array<number>>} samples - The training samples.
         * @param {Array<number>} labels - The training labels.
         * @param {number} kFold - Number of datasets into which to split the training set.
         * @throws if SVM instance was instantiated from SVM.load.
         * @return {Array<number>} The array of predicted labels produced by the cross validation. Has a size equal to
         * the number of samples provided as input.
         */
        crossValidation(samples: Array<Array<number>>, labels: Array<number>, kFold: number): Array<number>;
        /**
         * Free the memory allocated for the model. Since this memory is stored in the memory model of emscripten, it is
         * allocated within an ArrayBuffer and WILL NOT BE GARBARGE COLLECTED, you have to explicitly free it. So
         * not calling this will result in memory leaks. As of today in the browser, there is no way to hook the
         * garbage collection of the SVM object to free it automatically.
         * Free the memory that was created by the compiled libsvm library to.
         * store the model. This model is reused every time the predict method is called.
         */
        free(): void;
        getCommand(samples: any): string;
        /**
         * Predict the label of one sample.
         * @param {Array<number>} sample - The sample to predict.
         * @return {number} - The predicted label.
         */
        predictOne(sample: Array<number>): number;
        /**
         * Predict the label of many samples.
         * @param {Array<Array<number>>} samples - The samples to predict.
         * @return {Array<number>} - The predicted labels.
         */
        predict(samples: Array<Array<number>>): Array<number>;
        /**
         * Predict the label with probability estimate of many samples.
         * @param {Array<Array<number>>} samples - The samples to predict.
         * @return {Array<object>} - An array of objects containing the prediction label and the probability estimates for each label
         */
        predictProbability(samples: Array<Array<number>>): Array<object>;
        /** Predict the label with probability estimate.
         * @param {Array<number>} sample
         * @return {object} - An object containing the prediction label and the probability estimates for each label
         */
        predictOneProbability(sample: Array<number>): object;
        /** Predict a regression value with a confidence interval
         * @param {Array<number>} sample
         * @param {number} confidence - A value between 0 and 1. For example, a value 0.95 will give you the 95% confidence interval of the predicted value.
         * @return {object} - An object containing the prediction value and the lower and upper bounds of the confidence interval
         */
        predictOneInterval(sample: Array<number>, confidence: number): object;
        /** Predict regression values with confidence intervals
         * @param {Array<Array<number>>} samples - An array of samples.
         * @param {number} confidence - A value between 0 and 1. For example, a value 0.95 will give you the 95% confidence interval of the predicted value.
         * @return {Array<object>} - An array of objects each containing the prediction label and the probability estimates for each label
         */
        predictInterval(samples: Array<Array<number>>, confidence: number): Array<object>;
        _getInterval(confidence: any): number;
        /**
         * Get the array of labels from the model. Useful when creating an SVM instance with SVM.load
         * @return {Array<number>} - The list of labels.
         */
        getLabels(): Array<number>;
        /**
         * Get the indices of the support vectors from the training set passed to the train method.
         * @return {Array<number>} - The list of indices from the training samples.
         */
        getSVIndices(): Array<number>;
        /**
         * Uses libsvm's serialization method of the model.
         * @return {string} The serialization string.
         */
        serializeModel(): string;
    };
    /**
     * Create a SVM instance from the serialized model.
     * @param {string} serializedModel - The serialized model.
     * @return {SVM} - SVM instance that contains the model.
     */
    load(serializedModel: string): {
        options: {
            type?: number;
            kernel?: number;
            degree?: number;
            gamma?: number;
            coef0?: number;
            cost?: number;
            nu?: number;
            epsilon?: number;
            cacheSize?: number;
            tolerance?: number;
            shrinking?: boolean;
            probabilityEstimates?: boolean;
            weight?: object;
            quiet?: boolean;
        };
        model: any;
        /**
         * Trains the SVM model.
         * @param {Array<Array<number>>} samples - The training samples. First level of array are the samples, second
         * level are the individual features
         * @param {Array<number>} labels - The training labels. It should have the same size as the samples. If you are
         * training a classification model, the labels should be distinct integers for each class. If you are training
         * a regression model, each label should be the value of the predicted variable.
         * @throws if SVM instance was instantiated from SVM.load.
         */
        train(samples: Array<Array<number>>, labels: Array<number>): void;
        problem: any;
        /**
         * Performs k-fold cross-validation (KF-CV). KF-CV separates the data-set into kFold random equally sized partitions,
         * and uses each as a validation set, with all other partitions used in the training set. Observations left over
         * from if kFold does not divide the number of observations are left out of the cross-validation process. If
         * kFold is one, this is equivalent to a leave-on-out cross-validation
         * @param {Array<Array<number>>} samples - The training samples.
         * @param {Array<number>} labels - The training labels.
         * @param {number} kFold - Number of datasets into which to split the training set.
         * @throws if SVM instance was instantiated from SVM.load.
         * @return {Array<number>} The array of predicted labels produced by the cross validation. Has a size equal to
         * the number of samples provided as input.
         */
        crossValidation(samples: Array<Array<number>>, labels: Array<number>, kFold: number): Array<number>;
        /**
         * Free the memory allocated for the model. Since this memory is stored in the memory model of emscripten, it is
         * allocated within an ArrayBuffer and WILL NOT BE GARBARGE COLLECTED, you have to explicitly free it. So
         * not calling this will result in memory leaks. As of today in the browser, there is no way to hook the
         * garbage collection of the SVM object to free it automatically.
         * Free the memory that was created by the compiled libsvm library to.
         * store the model. This model is reused every time the predict method is called.
         */
        free(): void;
        getCommand(samples: any): string;
        /**
         * Predict the label of one sample.
         * @param {Array<number>} sample - The sample to predict.
         * @return {number} - The predicted label.
         */
        predictOne(sample: Array<number>): number;
        /**
         * Predict the label of many samples.
         * @param {Array<Array<number>>} samples - The samples to predict.
         * @return {Array<number>} - The predicted labels.
         */
        predict(samples: Array<Array<number>>): Array<number>;
        /**
         * Predict the label with probability estimate of many samples.
         * @param {Array<Array<number>>} samples - The samples to predict.
         * @return {Array<object>} - An array of objects containing the prediction label and the probability estimates for each label
         */
        predictProbability(samples: Array<Array<number>>): Array<object>;
        /** Predict the label with probability estimate.
         * @param {Array<number>} sample
         * @return {object} - An object containing the prediction label and the probability estimates for each label
         */
        predictOneProbability(sample: Array<number>): object;
        /** Predict a regression value with a confidence interval
         * @param {Array<number>} sample
         * @param {number} confidence - A value between 0 and 1. For example, a value 0.95 will give you the 95% confidence interval of the predicted value.
         * @return {object} - An object containing the prediction value and the lower and upper bounds of the confidence interval
         */
        predictOneInterval(sample: Array<number>, confidence: number): object;
        /** Predict regression values with confidence intervals
         * @param {Array<Array<number>>} samples - An array of samples.
         * @param {number} confidence - A value between 0 and 1. For example, a value 0.95 will give you the 95% confidence interval of the predicted value.
         * @return {Array<object>} - An array of objects each containing the prediction label and the probability estimates for each label
         */
        predictInterval(samples: Array<Array<number>>, confidence: number): Array<object>;
        _getInterval(confidence: any): number;
        /**
         * Get the array of labels from the model. Useful when creating an SVM instance with SVM.load
         * @return {Array<number>} - The list of labels.
         */
        getLabels(): Array<number>;
        /**
         * Get the indices of the support vectors from the training set passed to the train method.
         * @return {Array<number>} - The list of indices from the training samples.
         */
        getSVIndices(): Array<number>;
        /**
         * Uses libsvm's serialization method of the model.
         * @return {string} The serialization string.
         */
        serializeModel(): string;
    };
    /**
     * SVM classification and regression types
     * @memberof SVM
     * @type {{C_SVC: string, NU_SVC: string, ONE_CLASS: string, EPSILON_SVR: string, NU_SVR: string}}
     * @property C_SVC - The C support vector classifier type
     * @property NU_SVC - The nu support vector classifier type
     * @property ONE_CLASS - The one-class support vector classifier type
     * @property EPSILON_SVR - The epsilon support vector regression type
     * @property NU_SVR - The nu support vector regression type
     */
    SVM_TYPES: {
        C_SVC: string;
        NU_SVC: string;
        ONE_CLASS: string;
        EPSILON_SVR: string;
        NU_SVR: string;
    };
    /**
     * SVM kernel types
     * @memberof SVM
     * @type {{LINEAR: string, POLYNOMIAL: string, RBF: string, SIGMOID: string, PRECOMPUTED:string}}
     * @property LINEAR - Linear kernel
     * @property POLYNOMIAL - Polynomial kernel
     * @property RBF - Radial basis function (gaussian) kernel
     * @property SIGMOID - Sigmoid kernel
     * @property PRECOMPUTED - Precomputed
     */
    KERNEL_TYPES: {
        LINEAR: string;
        POLYNOMIAL: string;
        RBF: string;
        SIGMOID: string;
        PRECOMPUTED: string;
    };
};
