import { ruleTester } from "../../../testUtils"
import rule, { ruleName, messages } from ".."

const testRule = ruleTester(rule, ruleName)

testRule("always", tr => {
  tr.ok("a {\ncolor: pink; }")
  tr.ok("a{\ncolor: pink; }")
  tr.ok("a{\n\tcolor: pink; }")
  tr.ok("a{\n  color: pink; }")
  tr.ok("@media print {\na {\ncolor: pink; } }")
  tr.ok("@media print{\na{\ncolor: pink; } }")
  tr.ok("@media print{\n\ta{\n  color: pink; } }")

  tr.notOk("a { color: pink; }", messages.expectedAfter())
  tr.notOk("a {color: pink; }", messages.expectedAfter())
  tr.notOk("a {  color: pink; }", messages.expectedAfter())
  tr.notOk("a {\tcolor: pink; }", messages.expectedAfter())
  tr.notOk("@media print { a {\ncolor: pink; } }", messages.expectedAfter())
  tr.notOk("@media print {\na { color: pink; } }", messages.expectedAfter())
})

testRule("never", tr => {
  tr.ok("a {color: pink; }")
  tr.ok("a{color: pink; }")
  tr.ok("@media print {a {color: pink; } }")
  tr.ok("@media print{a{color: pink; } }")

  tr.notOk("a { color: pink; }", messages.rejectedAfter())
  tr.notOk("a {\ncolor: pink; }", messages.rejectedAfter())
  tr.notOk("a {  color: pink; }", messages.rejectedAfter())
  tr.notOk("a {\tcolor: pink; }", messages.rejectedAfter())
  tr.notOk("@media print {\na {color: pink; } }", messages.rejectedAfter())
  tr.notOk("@media print {a {\ncolor: pink; } }", messages.rejectedAfter())
})