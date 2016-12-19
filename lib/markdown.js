/* jshint node:true */
"use strict";

function markdownBadger(content, imgUrl, linkUrl, altText) {
  var lines = content.split(/\n/);
  var badgeContent = getBadgeMarkdown(imgUrl, linkUrl, altText);

  insertInIdealLine(lines, badgeContent);
  return lines.join('\n');
}

function getBadgeMarkdown(imgUrl, linkUrl, altText) {
  return '[![' + altText + '](' + imgUrl + ')](' + linkUrl + ')';
}

function insertInIdealLine(lines, markdown) {
  var lineToInsert = 0;
  var badgeLine = findMatchingLine(lines, /\[!\[.*]\(.*\)]\(.*\)/);

  if (badgeLine !== -1) {
    lineToInsert = badgeLine;
  } else {
    var headerLine = findMatchingLine(lines, /^\s*(\#+|={3,}|-{3,})/);
    lineToInsert = headerLine + 1;
    markdown = '\n' + markdown;

    if (lines[lineToInsert].length != 0) {
      markdown += '\n';
    }
  }

  lines.splice(lineToInsert, 0, markdown);
}

function findMatchingLine(lines, regex) {
  var i = 0;
  for (; i < lines.length; i++) {
    if (regex.test(lines[i])) {
      return i;
    }
  }
  return -1;
}

module.exports = markdownBadger;
