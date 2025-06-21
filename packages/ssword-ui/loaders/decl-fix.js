import ts from "typescript";

/** @type {import('ttypescript/lib/PluginCreator').PluginCreator} */
export default function declFixPlugin() {
  return (ctx) => {
    return (sf) => {
      function visit(node) {
        // import ... from "@/..."
        if (
          (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) &&
          node.moduleSpecifier &&
          ts.isStringLiteral(node.moduleSpecifier) &&
          node.moduleSpecifier.text.startsWith("@/")
        ) {
          const fixed = "./" + node.moduleSpecifier.text.slice(2);
          const updated = ts.factory.createStringLiteral(fixed);
          return (
            ts.factory.updateImportDeclaration?.(
              node,
              node.modifiers,
              node.importClause,
              updated,
              node.assertClause,
            ) ??
            ts.factory.updateExportDeclaration(
              node,
              node.modifiers,
              node.isTypeOnly,
              node.exportClause,
              updated,
              node.assertClause,
            )
          );
        }

        // require("@/...")
        if (
          ts.isCallExpression(node) &&
          node.expression.escapedText === "require" &&
          node.arguments.length === 1 &&
          ts.isStringLiteral(node.arguments[0]) &&
          node.arguments[0].text.startsWith("@/")
        ) {
          const fixed = "./" + node.arguments[0].text.slice(2);
          const newArg = ts.factory.createStringLiteral(fixed);
          return ts.factory.updateCallExpression(
            node,
            node.expression,
            node.typeArguments,
            [newArg],
          );
        }

        return ts.visitEachChild(node, visit, ctx);
      }

      return ts.visitNode(sf, visit);
    };
  };
}
