import type { Transformer } from "unified";
import type { Node, Parent } from "unist";
import { visit } from "unist-util-visit";

interface DirectiveChild extends Node {
  data?: {
    directiveLabel?: boolean;
  };
  children?: Array<{ value?: string }>;
}

interface DirectiveNode extends Parent {
  type: "containerDirective" | "leafDirective" | "textDirective";
  name: string;
  attributes: Record<string, string>;
  data?: {
    hName?: string;
    hProperties?: Record<string, unknown>;
  };
}

export function remarkAdmonitions(): Transformer {
  return (tree: Node) => {
    visit(tree, (node) => {
      if (
        node.type === "containerDirective" ||
        node.type === "leafDirective" ||
        node.type === "textDirective"
      ) {
        const directive = node as DirectiveNode;
        if (
          directive.name !== "note" &&
          directive.name !== "tip" &&
          directive.name !== "info" &&
          directive.name !== "warning" &&
          directive.name !== "danger"
        ) {
          return;
        }

        if (!directive.data) {
          directive.data = {};
        }

        const data = directive.data;
        const attributes = directive.attributes || {};
        let title = attributes.title;

        if (!title) {
          const firstChild = directive.children[0] as
            | DirectiveChild
            | undefined;
          if (firstChild?.data?.directiveLabel) {
            // Extract text from the label
            if (
              "children" in firstChild &&
              Array.isArray(firstChild.children)
            ) {
              title = firstChild.children
                .map((child) => child.value || "")
                .join("");
            }
            // Remove the label from children
            directive.children.shift();
          }
        }

        data.hName = "Callout";
        data.hProperties = {
          ...attributes,
          type: directive.name,
          title,
        };
      }
    });
  };
}
