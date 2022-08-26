module.exports = function (source) {
  console.log('666666', source);
  let str = `
  <template>
      <div class="content element-doc">
      ${source}11
      </div>
    </template>
  `;
  return str;
};
