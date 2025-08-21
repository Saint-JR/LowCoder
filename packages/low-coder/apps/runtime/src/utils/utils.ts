export const isWujieEnv = () => !!window.__POWERED_BY_WUJIE__;

export const getWujie = () => window.$wujie ?? null;

export const parseExpression = (
  expression: string,
  context: Record<string, any>,
): any => {
  try {
    // 创建一个新的函数，参数是上下文对象，函数体是表达式
    const func = new Function(
      'context',
      `with(context) { return ${expression}; }`,
    );
    // 执行函数，并传入上下文
    return func(context);
  } catch {
    return expression;
  }
};
