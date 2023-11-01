<template>
  <Html>
    <Head />
    <Preview>New message from your portfolio site</Preview>
    <Tailwind>
      <Body class="bg-gray-100 text-black">
        <Container>
          <Section class="bg-white borderBlack my-10 px-10 py-4 rounded-md">
            <Heading class="leading-tight">
              You received the following message from the contact form
            </Heading>
            <Text>{{ message }}</Text>
            <Hr />
            <Text>The sender's email is: {{ senderEmail }}</Text>
          </Section>
        </Container>
      </Body>
    </Tailwind>
  </Html>
</template>

<script>
export default {
  props: {
    message: String,
    senderEmail: String,
  },
};
</script>
